//variables
const noteList = document.querySelector("#note-list")

//eventlistners

eventlisteners()

function eventlisteners() {
    //form submission

    document.querySelector("#form").addEventListener('submit', newNote);
    //remove note
    document.querySelector('#note-list').addEventListener('click', removeNote)

    // get data from local Stroge on load
    document.addEventListener('DoMContentLoaded', localStorageOnload)
}


//function


//Adding new note to the list

function newNote(e) {
    e.preventDefault()
    // access to the value

    const note = document.querySelector('#note').value;


    //create remove btn

    const removeBtn = document.createElement('a')
    removeBtn.textContent = "X"
    removeBtn.classList = 'remove-note'

    //creat <li> tag
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(note))

    // adding remove btn to the li
    li.appendChild(removeBtn)

    // adding li to the note-list
    noteList.appendChild(li)

   
    {
        const reset = document.querySelector('#submit').style.background = "red";
        
        this.reset()
    }
    addNoteTolocalStrorage(note)
    alert('یاد داشت با موفقیت ذخیره شد')
}

//remove Note from list
function removeNote(e) {
    if (e.target.classList.contains('remove-note')) {
        e.target.parentElement.remove()
    }
   
    // also remote the note from the LocalStroge
    removeNoteLocalStroge(e.target.parentElement.textContent)
}

//adding note to localstroge

function addNoteTolocalStrorage(note) {
    // get the note from localStroge
    const notes = getNotesFromLocalStroge()
    // add new note to the noets array
    notes.push(note);
    // add new notes Array to the localStroge
    localStorage.setItem('notes', JSON.stringify(notes))
}

//get notes from localStroge for cheack lS
function getNotesFromLocalStroge() {
    let notes;
    // get previous notes from localStroge
    let getFormLs = localStorage.getItem('notes')
    if (getFormLs === null) {
        // if not exist create empty

        notes = []
    } else {
        // if exist convert to the array
        notes = JSON.parse(localStorage.getItem('notes'))
    }
    return notes
}

// get data from local stroge on load

function localStorageOnload() {
    const notes = getNotesFromLocalStroge()

    // print each item of array
    notes.forEach(note => {
        const removeBtn = document.createElement('a')
        removeBtn.textContent = "X"
        removeBtn.classList = 'remove-note'

        //creat <li> tag
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(note))

        // adding remove btn to the li
        li.appendChild(removeBtn)

        // adding li to the note-list
        noteList.appendChild(li)
    });
}

// also Remove note from LocalStroge
function  removeNoteLocalStroge(noteContent){

    // delete X from the content
    const noteDelete = noteContent.substring (0 ,noteContent.lenght - 1 )
    // get notes from localStroge
    const notesFromLS = getNotesFromLocalStroge()
    notesFromLS.forEach(note , index => {
        if(note === noteDelete ){
            notesFromLS.splice(index, 1)

        }
    });

    // set new array of notes to the local strorage
    localStorage.setItem('notes' , JSON.stringify(notesFromLS))
}