import { getCode, getIssueEvent, getOwnerAndRepo, octokit } from "./common.ts";
import { join } from "https://deno.land/std@0.188.0/path/mod.ts";
import "npm:@babel/parser";

const systemPrompt = await Deno.readTextFile(
  join('prompts', "./vue-ui-gen.md")
);

const PLACEHOLDER_CODE = `<script setup>
const props = defineProps({});
</script>

<template>
  <p>placeholder</p>
</template>`;

async function main() {
  //var prompt = 'a login form', images = [];
  const { githubEvent, eventName } = await getIssueEvent();
  const { owner, repo } = getOwnerAndRepo();
  var prompt = githubEvent.issue.title, images = [];
  prompt += `
Previously you already implemented the following code, use it as a reference and meet my new requirements:
\`\`\`vue
${PLACEHOLDER_CODE}
\`\`\`
`;

  const { code, usage, description } = await getCode(
    [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt,
          },
          ...images.map(
            (image) =>
            ({
              type: "image_url",
              image_url: {
                url: image,
              },
            } as const)
          ),
        ],
      },
    ],
    "gpt-3.5-turbo"
  );
  console.log(JSON.stringify(usage, null, 2));
  await Deno.writeTextFile(
    join('vue-preview-ui', "./src/Preview.vue"), code
  );
  const issueNumber = parseInt(
    githubEvent.issue.url.match(/issues\/(\d+)/)?.[1] || ""
  );
  const runNumber = Deno.env.get("RUN_NUMBER");
  await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: issueNumber,
    body: `[Preview UI](https://xing393939.github.io/autogen-vue-code/${runNumber}) \n\n ${description}`,
  });
}

main();