export type ErrorProps = {
  errorMessage?: string | null;
};

export const Error = ({ errorMessage }: ErrorProps) => {
  if (!errorMessage) return null;

  return (
    <div role="alert" aria-label={errorMessage} className="absolute -bottom-4 text-[12px] leading-4 text-red-500">
      {errorMessage}
    </div>
  );
};
