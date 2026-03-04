type HandleImageChangeOption = {
  maxSizeMB: number;
  onValid: (file: File) => void;
  onError?: (message: string) => void;
};

export function createImageChangeHandler({
  maxSizeMB = 1,
  onValid,
  onError,
}: HandleImageChangeOption) {
  const MAX_SIZE = maxSizeMB * 1024 * 1024;

  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_SIZE) {
      onError?.('이미지는 1MB 이하로 업로드 해주세요.');
      e.target.value = '';
      return;
    }
    onValid(file);
  };
}

export const extractThumbnail = (description: string) => {
  const imgRex = /<img[^>]+src=["']([^"']+)["']/i;
  const match = description.match(imgRex);
  return match ? match[1] : null;
};
