const noOfHashFunction = 6 // number of hash functions

function hash(key: string) {
  const hashNumbers = []
  for (let i = 1; i <= noOfHashFunction; i++) {
    hashNumbers.push(
      Math.abs(
        key.split('').reduce((a, b) => ((a << i) - a + b.charCodeAt(0)) | 0, 0),
      ),
    )
  }
  return hashNumbers
}

export function isValueContainInBloom(strArr: Array<string>, searchStr: string) {
  const storage = Array(2 ** 22 - 1).fill(0) // Bllom filter bit
  strArr.forEach((str) => {
    const indexes = hash(str)
    indexes.forEach(index => (storage[index] = 1))
  })
  const hashes = hash(searchStr)
  const result = hashes.filter(index => !storage[index])
  return !(result.length > 0)
}

export function useChatEvent() {
  const room = ref()

  return {
    room,
  }
}
