export interface CustomModalProps {
  open: boolean;
  onCancel?: () => void;
  title?: string;
  children?: React.ReactNode;
}