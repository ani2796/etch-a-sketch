// etch a sketch javascript

let dims, drawOption;
initialize();

function attachGridDimsEvents(gridContainer, dimsSlider, display) {
    dimsSlider.addEventListener("input", (e) => {
        const dims = e.target.value;
        display.value = dims;
        createGrid(gridContainer, dims);
    });

    ['blur', 'keyup'].forEach(trigger => {
        display.addEventListener(trigger, (e) => {
            if(trigger === 'keyup' && e.keyCode !== 13) return;
            const dims = +e.target.value;
            console.log(dims);
    
            if(!(typeof dims === 'number' && +dims >= 1 && +dims <= 100)) {
                display.value = 50;
                dimsSlider.value = 50;
            } else {
                dimsSlider.value = dims;
                createGrid(gridContainer, dims);
            }
    });
    
    })
}

function attachDraw(mode = "Black") {
    const boxes = document.querySelectorAll('.box');
    let moved = false;

    boxes.forEach(
        box => {
            box.addEventListener('mousedown', (e => {
                moved = true;
            }));
            box.addEventListener('mouseover', e => {
                if(moved)
                    switch(mode) {
                        case 'Black':   e.target.style.backgroundColor = 'black';
                                        break;
                        case 'Color':   e.target.style.backgroundColor = 'green';
                                        break;
                        case 'Erase':   e.target.style.backgroundColor = 'white';
                                        break;
                    }
                    
                
            })
            box.addEventListener('mouseup', e => {
                moved = false;
            })
        }
    );
}

function attachModeSelector(modeRadios) {
    
    modeRadios.forEach(button => {
        button.addEventListener('click', e => {
            attachDraw(e.target.value);
        })
    })
}

function createGrid(gridContainer, dims) {
    gridContainer.replaceChildren();
    for(let i=0;i<dims;i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for(let j=0;j<dims;j++) {
            const box = createGridBox();
            row.appendChild(box);
        }
        gridContainer.appendChild(row);
    }
    attachDraw();
}

function createGridBox() {
    const box = document.createElement('div');
    box.style.border = '1px solid black';
    box.style.flex = '1 1 auto';
    box.style.marginTop = '-1';
    box.style.marginLeft = '-1';
    box.style.backgroundColor = 'white';
    box.classList.add('box');

    return box;
}

function initialize() {
    // Query selecting elements
    const dimsSlider = document.querySelector('.slider');
    const modeRadios = document.querySelectorAll('input[name="mode"]')
    const display = document.querySelector('.grid-dim');
    const gridContainer = document.querySelector('.grid-container');

    dims = dimsSlider.value;

    // Changing content values/looks
    display.value = dims;
    createGrid(gridContainer, dims);

    //Adding event listeners
    attachGridDimsEvents(gridContainer, dimsSlider, display);
    attachModeSelector(modeRadios);
}
