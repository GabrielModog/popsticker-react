export function appendClasses(currentClass: string, newClass: string): string {
  if(!newClass) return currentClass
  return currentClass + " " + newClass
}