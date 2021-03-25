package main

import "fmt"

func main() {
	var t int
	fmt.Scan(&t)
	for t > 0 {
		var n int
		fmt.Scan(&n)
		notes := make([]int, n)
		diversity := 0
		notesMap := make(map[int]bool)
		for i := 0; i < n; i++ {
			fmt.Scan(&notes[i])
			if _, ok := notesMap[notes[i]]; !ok {
				diversity++
				notesMap[notes[i]] = true
			} else {
				if _, ok := notesMap[notes[i]+1]; !ok {
					notesMap[notes[i]+1] = true
					diversity++
				}
			}
		}
		fmt.Println(diversity)
		t--
	}
}
