const container = document.querySelector(".container");
        let cards = document.querySelectorAll(".cards");
        const left = document.querySelector(".left");
        const done = document.querySelector(".done");
        const winOrLose = document.querySelector(".winOrLose");
        const reset = document.querySelector(".reset");
        const icons = [
            { icon: "🐖", value: 1 },
            { icon: "🐅", value: 2 },
            { icon: "🦛", value: 3 },
            { icon: "🦏", value: 4 },
            { icon: "🦌", value: 5 },
            { icon: "🐎", value: 6 },
            { icon: "🐆", value: 7 },
            { icon: "🐘", value: 8 },
            { icon: "🐖", value: 1 },
            { icon: "🐅", value: 2 },
            { icon: "🦛", value: 3 },
            { icon: "🦏", value: 4 },
            { icon: "🦌", value: 5 },
            { icon: "🐎", value: 6 },
            { icon: "🐆", value: 7 },
            { icon: "🐘", value: 8 }
        ];

        let selected = [];
        let allowClick = true;
        let matches = 0;
        let moves = 16;

        reset.addEventListener('click', () => {
            selected = [];
            allowClick = true;
            matches = 0;
            moves = 16;
            left.innerHTML = moves;
            done.innerHTML = matches;
            winOrLose.textContent = "";
            winOrLose.style.opacity = "0";
            container.innerHTML = `
                <button class="cards">❓</button>
                <button class="cards">❓</button>
                <button class="cards">❓</button>
                <button class="cards">❓</button>
                <button class="cards">❓</button>
                <button class="cards">❓</button>
                <button class="cards">❓</button>
                <button class="cards">❓</button>
                <button class="cards">❓</button>
                <button class="cards">❓</button>
                <button class="cards">❓</button>
                <button class="cards">❓</button>
                <button class="cards">❓</button>
                <button class="cards">❓</button>
                <button class="cards">❓</button>
                <button class="cards">❓</button>`
                cards = document.querySelectorAll(".cards");
                shuffleIcons();
                updateCards();
            });

        function shuffleIcons(){
            for(let i = 0; i < 16; i++){
                let number = Math.floor(Math.random() * 16);
                [icons[i], icons[number]] = [icons[number], icons[i]];
            }
        }

        shuffleIcons();
        updateCards();

        function updateCards(){
            cards.forEach((card, index) => {
                let icon = icons[index].icon;
                card.addEventListener('click', (event) => {
                    if (!allowClick){
                        return;
                    }

                    if (selected.length === 1 && selected[0].card === event.target){
                        return;
                    }

                    if (event.target.classList.contains("matched")){
                        return;
                    }

                    event.target.classList.add("turn");
                    event.target.textContent = icon;
                    

                    selected.push({
                        card, 
                        value: icons[index].value
                    });

                    if (selected.length === 2){
                        allowClick = false;
                        moves--;
                        left.innerHTML = moves;

                        if (selected[0].value === selected[1].value){
                            selected[0].card.style.backgroundColor = "rgba(0, 255, 0, 0.792)";
                            selected[1].card.style.backgroundColor = "rgba(0, 255, 0, 0.792)";
                            selected[0].card.classList.add("matched");
                            selected[1].card.classList.add("matched");
                            selected = [];
                            matches++;
                            done.innerHTML = matches;
                            allowClick = true;
                            
                            if (moves === 0){
                                allowClick = false;
                                winOrLose.style.color = "red";
                                winOrLose.style.opacity = "1";
                                winOrLose.textContent = "No More Moves";
                            }

                            if (matches === 8){
                                allowClick = false;
                                winOrLose.style.color = "black";
                                winOrLose.style.opacity = "1";
                                winOrLose.textContent = "You Win!";
                            }
                            return;
                        }

                        setTimeout(() => {
                            selected[0].card.textContent = "❓";
                            selected[1].card.textContent = "❓";
                            selected[0].card.classList.remove("turn");
                            selected[1].card.classList.remove("turn");
                            selected = [];
                            allowClick = true;

                            if (moves === 0){
                                allowClick = false;
                                winOrLose.style.color = "red";
                                winOrLose.style.opacity = "1";
                                winOrLose.textContent = "No More Moves";
                            }
                        }, 2000);
                    }
                })
            });
        }
