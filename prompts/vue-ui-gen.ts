import { getCode, getIssueEvent, getOwnerAndRepo, octokit } from "./common.ts";
import { join } from "https://deno.land/std@0.188.0/path/mod.ts";
import "npm:@babel/parser";

const systemPrompt = await Deno.readTextFile(
  join('../prompts', "./vue-ui-gen.md")
);

const PLACEHOLDER_CODE = `<script setup>
const props = defineProps({});
</script>

<template>
  <p>placeholder</p>
</template>`;

async function cmdRun(chatList) {
  const { code, usage, description } = await getCode(
    [
      {
        role: "system",
        content: systemPrompt,
      },
      ...chatList,
    ],
    "gpt-3.5-turbo"
  );
  console.log(JSON.stringify(usage, null, 2));
  await Deno.writeTextFile(
    join('../vue-preview-ui', "./src/Preview.vue"), code
  );

  const cmd = Deno.run({
    cmd: ["npm", "run", "build", "--no-color"],
    stdout: "piped",
    stderr: "piped"
  });
  for await (const chunk of cmd.stdout.readable) {
    console.log(new TextDecoder().decode(chunk))
  }
  var cmdErr = '';
  for await (const chunk of cmd.stderr.readable) {
    cmdErr += new TextDecoder().decode(chunk);
  }
  cmd.close();
  return { code, description, cmdErr }
}

async function main() {
  const { githubEvent, eventName } = await getIssueEvent();
  const { owner, repo } = getOwnerAndRepo();
  var prompt = githubEvent.issue.title;
  prompt += `
Previously you already implemented the following code, use it as a reference and meet my new requirements:
\`\`\`vue
${PLACEHOLDER_CODE}
\`\`\`
`;

  var firstList = [{
    role: "user",
    content: [
      {
        type: "text",
        text: prompt,
      }
    ],
  }];
  var { code, description, cmdErr } = await cmdRun(firstList);
  if (cmdErr) {
    console.log(cmdErr);
    firstList.push({
      role: "assistant",
      content: [{ type: "text", text: '```vue\n' + code + '\n```' }],
    });
    const newPrompt = `I got the following error when using your code: \n\n ${cmdErr} \n\n Please modify your code and meet my new requirements.`
    firstList.push({
      role: "user",
      content: [{ type: "text", text: newPrompt }],
    });
    var { code, description, cmdErr } = await cmdRun(firstList);
  }

  const runNumber = Deno.env.get("RUN_NUMBER");
  var body = `[Preview UI](https://xing393939.getlocx.net/autogen-vue-code/${runNumber}/) \n\n ${description}`;
  if (cmdErr) {
    body = '```\n' + cmdErr + '\n```';
  }
  const issueNumber = parseInt(
    githubEvent.issue.url.match(/issues\/(\d+)/)?.[1] || ""
  );
  await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: issueNumber,
    body: body,
  });
  if (cmdErr) {
    throw new Error(cmdErr);
  }
}

main();
