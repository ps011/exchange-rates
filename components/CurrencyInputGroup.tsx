export default function CurrencyInputGroup({
  select,
  input,
}: {
  select: JSX.Element;
  input: JSX.Element;
}) {
  return (
    <div className="flex flex-col my-4 mx-12 md:flex-row md:mx-0">
      <div className="my-1 md:flex-1 md:mx-1" data-testid="select">
        {select}
      </div>
      <div className="my-1 md:flex-1 md:mx-1" data-testid="input">
        {input}
      </div>
    </div>
  );
}
