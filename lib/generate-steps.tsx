import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { Step } from 'fumadocs-ui/components/steps';

type Step = {
  content: string;
  code: string;
};

export default function generateSteps({ steps }: { steps: Step[] }) {
  return (
    <>
      {steps.map((step, index) => (
        <Step key={index}>
          <p>{step.content}</p>
          <DynamicCodeBlock lang="javascript" code={step.code} />
        </Step>
      ))}
    </>
  );
}
