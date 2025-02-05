export interface Diff {
  diff: string;
  new_path: string;
  old_path: string;
  a_mode: number;
  b_mode: number;
  new_file: boolean;
  renamed_file: boolean;
  deleted_file: boolean;
}
