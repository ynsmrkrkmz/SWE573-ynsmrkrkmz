export default async function sleep(miliseconds: number) {
  await new Promise((resolve) => setTimeout(resolve, miliseconds));
}
