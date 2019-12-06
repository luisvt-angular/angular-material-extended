export interface NavTreeItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavTreeItem[];
}
