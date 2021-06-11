import { BloodPressureEntry } from "./model";

export const BloodPressureDetails = (props: BloodPressureDetailsProps) => {
    return (<>
      {props.entry.systolic}/{props.entry.diastolic} {props.entry.pulse}
    </>);
  };
  
  interface BloodPressureDetailsProps {
    entry: BloodPressureEntry
  }
  