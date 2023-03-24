import { PropsWithChildren } from "react";

export default function BorderWrapper(props: PropsWithChildren) {
  return <div className="border-wrapper">{props.children}</div>;
}
