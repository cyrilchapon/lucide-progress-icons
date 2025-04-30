import {
  FullProgressCircleCheck,
  ProgressCircle,
  ProgressDiamond,
  ProgressHexagon,
  ProgressPentagon,
  ProgressTriangle,
} from "@chimanos/lucide-progress-icon";
import { CircleDashed } from "lucide-react";
import { DemoGroup, DemoGroupItemList } from "./components/demo-group";

const percentagesLarge = [
  0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65,
  0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1,
];

const percentagesLess = [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1];

const sizeClassName = "size-6 lg:size-8";

export default function Home() {
  return (
    <div className="w-dvw h-dvh flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <DemoGroup title="Precise calculation">
          <DemoGroupItemList>
            {percentagesLarge.map((p) => (
              <ProgressCircle key={p} progress={p} className={sizeClassName} />
            ))}
          </DemoGroupItemList>
        </DemoGroup>

        <DemoGroup title="Custom full and empty">
          <DemoGroupItemList>
            {percentagesLess.map((p) => (
              <ProgressCircle
                key={p}
                progress={p}
                className={sizeClassName}
                emptyIcon={CircleDashed}
                emptyClassName="text-gray-900/70 dark:text-white/60"
                fullIcon={FullProgressCircleCheck}
                fullClassName="[&>*]:stroke-green-600 [&>:nth-child(2)]:fill-green-600 [&>*]:dark:stroke-green-400 [&>:nth-child(2)]:dark:fill-green-400 [&>:last-child]:stroke-gray-200 [&>:last-child]:dark:stroke-gray-800"
              />
            ))}
          </DemoGroupItemList>
        </DemoGroup>

        <DemoGroup title="Precise calculation">
          <DemoGroupItemList>
            {percentagesLarge.map((p) => (
              <ProgressDiamond key={p} progress={p} className={sizeClassName} />
            ))}
          </DemoGroupItemList>
        </DemoGroup>

        <DemoGroup title="Precise calculation">
          <DemoGroupItemList>
            {percentagesLarge.map((p) => (
              <ProgressPentagon
                key={p}
                progress={p}
                className={sizeClassName}
              />
            ))}
          </DemoGroupItemList>
        </DemoGroup>

        <DemoGroup title="Precise calculation">
          <DemoGroupItemList>
            {percentagesLarge.map((p) => (
              <ProgressHexagon key={p} progress={p} className={sizeClassName} />
            ))}
          </DemoGroupItemList>
        </DemoGroup>

        <DemoGroup title="Precise calculation">
          <DemoGroupItemList>
            {percentagesLarge.map((p) => (
              <ProgressTriangle
                key={p}
                progress={p}
                className={sizeClassName}
              />
            ))}
          </DemoGroupItemList>
        </DemoGroup>
      </div>
    </div>
  );
}
