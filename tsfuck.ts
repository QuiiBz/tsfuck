type Increment<Value extends number, Array extends number[] = []> = Array['length'] extends Value
  ? [...Array, 0]['length']
  : Increment<Value, [...Array, 0] >
type Decrement<Value extends number, Previous = 0, Array extends number[] = []> = Array['length'] extends Value
  ? Previous
  : Decrement<Value, Array['length'], [...Array, 0]>

type SetInMemory<
  Memory extends any[],
  Value extends any,
  Position extends number,
  CurrentPosition extends number = 0,
  NewMemory extends any[] = [],
> = CurrentPosition extends Memory['length']
  ? NewMemory
  : CurrentPosition extends Position
  ? SetInMemory<Memory, Value, Position, Increment<CurrentPosition>, [...NewMemory, Value]>
  : SetInMemory<Memory, Value, Position, Increment<CurrentPosition>, [...NewMemory, Memory[CurrentPosition]]>

type BrainFuck<
  Program extends string,
  Memory extends any[] = [],
  Input extends any = never,
  Pointer extends number = 0,
  Output extends string = '',
> = Program extends `>${infer Tail}`
  ? BrainFuck<Tail, Memory, Input, Increment<Pointer>, Output>
  : Program extends `<${infer Tail}`
  ? BrainFuck<Tail, Memory, Input, Decrement<Pointer>, Output>
  : Program extends `+${infer Tail}`
  ? BrainFuck<Tail, SetInMemory<Memory, Increment<Memory[Pointer]>, Pointer>, Input, Pointer, Output>
  : Program extends `-${infer Tail}`
  ? BrainFuck<Tail, SetInMemory<Memory, Decrement<Memory[Pointer]>, Pointer>, Input, Pointer, Output>
  : Program extends `,${infer Tail}`
  ? BrainFuck<Tail, SetInMemory<Memory, Input, Pointer>, Input, Pointer, Output>
  : Program extends `.${infer Tail}`
  ? BrainFuck<Tail, Memory, Input, Pointer, `${Output}${Memory[Pointer]}`>
  : Program extends `[${infer Loop}]${infer Tail}`
  ? BrainFuck<`${Loop}]${Tail}`, Memory, Input, Pointer, Output>
  : Program extends `]${infer Tail}`
  ? BrainFuck<Tail, Memory, Input, Pointer, Output>
  : Output

type Basic = BrainFuck<"+++.>++.>++-.", [0, 0, 0]> // 321
type Input = BrainFuck<"+++.>,.", [0, 0], 6>       // 36
type Loop = BrainFuck<"[->>+<<].>.>.", [1, 0, 0]>  // 001
