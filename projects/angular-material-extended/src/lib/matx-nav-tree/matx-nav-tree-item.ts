export interface MatxNavTreeItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: MatxNavTreeItem[];
}
