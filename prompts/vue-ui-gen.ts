import { getCode } from "./common.ts";
import { join } from "https://deno.land/std@0.188.0/path/mod.ts";
import "npm:@babel/parser";

const __dirname = 'prompts';
const systemPrompt = await Deno.readTextFile(
  join(__dirname, "./vue-ui-gen.md")
);

const PLACEHOLDER_CODE = `<script setup>
const props = defineProps({});
</script>

<template>
  <p>Dewhale placeholder</p>
</template>`;

async function main() {
  var prompt = 'a login form',
    images = [];

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
}

main();
