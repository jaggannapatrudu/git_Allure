
export default class Base {



    randomTextGeneration(length: number): string {
        const chars = 'abcdefghijklmnopqrstuvwxyzfakhbldsjvdbsadabdvsavbdsavdsdasds';
        return Array.from({ length }, () =>
            chars.charAt(Math.floor(Math.random() * chars.length))
        ).join('');
    }
    randomNumberGeneration(): number {
        let number = Math.floor(Math.random() * 9000000)
        return number
    }
    passwordGenerator(): string {
        let uText = 'GJDSFHSGFHLGLSALGGBJSGFSDKJFKDSFKFJDF'
        let lText = 'sdfggsdgsdgdsgsdgdsgsdfgsdfsfdsf'
        let schar = '@#$%^&&%$%^'
        let number = Math.floor(Math.random() * 100)
        let utext1 = Array.from({ length: 3 }, () =>
            uText.charAt(Math.floor(Math.random() * uText.length))
        ).join('')
        let ltext1 = Array.from({ length: 5 }, () =>
            lText.charAt(Math.floor(Math.random() * lText.length))
        ).join('')
        let schar1 = Array.from({ length: 2 }, () =>
            schar.charAt(Math.floor(Math.random() * schar.length))
        ).join('')

        let password = utext1 + ltext1 + schar1 + number.toString()
        return password
    }


}
