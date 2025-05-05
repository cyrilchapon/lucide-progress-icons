import {
  iconShapes,
  ProgressIcon,
  progressIconFillStrategies,
} from "@chimanos/lucide-progress-icon";
import {
  DemoCategory,
  DemoGroup,
  DemoGroupItemList,
} from "./components/demo-group";

const percentagesLarge = [
  0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65,
  0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1,
];

const percentagesLess = [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1];

const sizeClassName = "size-6 lg:size-8";

export default function Home() {
  return (
    <div className="w-dvw h-dvh flex flex-col items-center justify-center overflow-hidden">
      <div className="flex-1 flex flex-col items-center gap-10 p-4 overflow-scroll">
        {progressIconFillStrategies.map((strategy) => (
          <DemoCategory key={strategy} title={`fillStrategy="${strategy}"`}>
            {iconShapes.map((shape) => (
              <DemoGroup key={shape} title={`shape="${shape}"`}>
                <DemoGroupItemList>
                  {percentagesLess.map((p) => (
                    <ProgressIcon
                      key={p}
                      shape={shape}
                      fillStrategy={strategy}
                      progress={p}
                      className={sizeClassName}
                    />
                  ))}
                </DemoGroupItemList>
              </DemoGroup>
            ))}
          </DemoCategory>
        ))}

        <DemoCategory title="Additional features">
          <DemoGroup title={`placeholder={true}`}>
            <DemoGroupItemList>
              {percentagesLess.map((p) => (
                <ProgressIcon
                  key={p}
                  shape="circle"
                  fillStrategy="pie"
                  progress={p}
                  placeholder
                  className={sizeClassName}
                />
              ))}
            </DemoGroupItemList>
          </DemoGroup>
        </DemoCategory>
      </div>
    </div>
  );
}
