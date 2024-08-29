export function convertBytes(sizeInBytes: number): string {
  if (sizeInBytes === 0) {
    return '0B';
  }

  const sizeNames = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  let i = 0;

  while (sizeInBytes >= 1024 && i < sizeNames.length - 1) {
    sizeInBytes /= 1024;
    i++;
  }

  return `${sizeInBytes.toFixed(2)} ${sizeNames[i]}`;
}
