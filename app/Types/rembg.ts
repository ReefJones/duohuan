export interface RembgInterface {
  input_image: string;
  model?: string;
  return_mask?: boolean;
  alpha_matting?: boolean;
  alpha_matting_foreground_threshold?: number;
  alpha_matting_background_threshold?: number;
  alpha_matting_erode_size?: number;
}
