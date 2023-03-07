export function DateUpdate(expected_return_date?: string) {
  let date = new Date();
  if (expected_return_date) {
    date = new Date(expected_return_date);
    const expect = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      59,
      59
    );
    return expect;
  }

  const startDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59
  );

  return startDate;
}
