
declare module "react-date-range" {
  import * as React from "react";

  export interface Range {
    startDate?: Date;
    endDate?: Date;
    key?: string;
    color?: string;
    autoFocus?: boolean;
    disabled?: boolean;
    showDateDisplay?: boolean;
  }

  export interface DateRangePickerProps {
    ranges: Range[];
    onChange: (range: Range) => void;
    months?: number;
    direction?: "vertical" | "horizontal";
    showSelectionPreview?: boolean;
    moveRangeOnFirstSelection?: boolean;
    maxDate?: Date;
    [key: string]: any;
  }

  export class DateRangePicker extends React.Component<DateRangePickerProps> {}
}
