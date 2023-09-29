export interface Component {
  selector: string;
  template: string;
  render: (instance: any) => void;
}
