function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name: string) {
  const splitted = name.split(' ');
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: '36px',
      height: '36px',
    },
    children: `${splitted[0][0]}${name.split(' ')[splitted.length - 1][0]}`,
  };
}
