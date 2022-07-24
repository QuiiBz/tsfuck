## TSFuck

Brainfuck interpreter using TypeScript types. [See the code here](./tsfuck.ts).

Supports all [brainfuck commands](https://en.wikipedia.org/wiki/Brainfuck) (but might not support edge cases):
- `>` to increase the data pointer
- `<` to decrease the data pointer
- `+` to increment the byte at the data pointer
- `-` to increment the byte at the data pointer
- `.` to output the byte at the data pointer
- `,` to store a byte at the data pointer
- `[` & `]` to loop around a block of code, until the byte at the data pointer is 0

### License
[MIT](./LICENSE)
