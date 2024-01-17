// import { Note } from "./Note.js";

let newBtn = document.getElementById('new');

let newModal = document.getElementById('newModal');
let cancelNewModalBtn = document.getElementById('cancelNewModal');
let editModal = document.getElementById('editModal');
let cancelEditModalBtn = document.getElementById('cancelEditModal');

let notesListEl = document.getElementById('notes');

let saveBtn = document.getElementById('save');
let updateBtn = document.getElementById('update');
let deleteBtn = document.getElementById('delete');
let discardBtn = document.getElementById('discard');

let newNoteTitle = document.getElementById('titleText');
let newNoteBody = document.getElementById('newNote');
let editNoteTitle = document.getElementById('editTitleText');
let editNoteBody = document.getElementById('editNote');

let currentNote = {};

function closeModal(modal){
    modal.style.display = 'none';
}

function displayModal(modal){
    modal.style.display = 'flex';
}

function clearModalValues(modal){
    switch (modal) {
        case newModal:
            newNoteTitle.value = '';
            newNoteBody.value = '';
            break;
        
        case editModal:
            editNoteTitle.value = '';
            editNoteBody.value = '';
            break;
    
        default:
            break;
    }
}

function displayError(modal){
    let title;
    let body;
    switch (modal) {
        case newModal:
            title = newNoteTitle;
            body = newNoteBody;
            break;
        case editModal:
            title = editNoteTitle;
            body = editNoteBody;
            break;
    
        default:
            break;
    }

    if(!title.value){
        title.style.borderColor = 'red';
    }
    if(!body.value){
        body.style.borderColor = 'red';
    }

    setTimeout(() => {
        title.style.borderColor = 'green';
        body.style.borderColor = 'green';
    }, 3000);
}

function clearCurrentNote() {
    currentNote = {};
}

newBtn.addEventListener('click', () => {
    displayModal(newModal);
})

cancelNewModalBtn.addEventListener('click', () => {
    closeModal(newModal);
})

cancelEditModalBtn.addEventListener('click', () => {
    closeModal(editModal);
})

class Note {
    static notesList = [];
    
    addNote(note){
        Note.notesList.push(note);
        this.render();
    }

    deleteNote(note){
        let index = (Note.notesList).findIndex(
            n =>  (n.title === note.title && n.body === note.body));
        Note.notesList.splice(index, 1);
        this.render();
    }

    createDOMElement(element){
        let { tag, textContent, className } = element;
        let el = document.createElement(tag);
        if(textContent){
            el.textContent = textContent;
        }
        if(className){
            el.className = className;
        }  
        return el;
    }

    render(){
        notesListEl.innerHTML = '';

        if(!(Note.notesList.length)){
            notesListEl.style.justifyContent = 'center';
            notesListEl.style.marginTop = '30vh';
            notesListEl.innerHTML = '<h2>No Notes Found</h2>';
            return;
        }
        
        Note.notesList.forEach(note => {
            notesListEl.style.justifyContent = 'flex-start';
            notesListEl.style.marginTop = '2rem';

            let newNote = this.createDOMElement({tag: 'div', className: 'note'});
            let title = this.createDOMElement({tag: 'h3', textContent: note.title});
            let body = this.createDOMElement({tag: 'p', textContent: note.body});
            newNote.appendChild(title);
            newNote.appendChild(body);
            
            let editBtn = this.createDOMElement({tag: 'button', textContent: 'edit', className: 'edit'});
            let deleteBtn = this.createDOMElement({tag: 'button', textContent: 'delete', className: 'delete'});
            let noteActionsEl = this.createDOMElement({tag: 'div', className: 'actions'});
            noteActionsEl.appendChild(editBtn);
            noteActionsEl.appendChild(deleteBtn);
            newNote.appendChild(noteActionsEl);
            
            notesListEl.appendChild(newNote);
        })
          
    }
}



notesListEl.addEventListener('click', (event) => {
    if(event.target.classList.contains('edit')){  
        let noteDiv = event.target.parentElement.parentElement;
        currentNote.title = noteDiv.children[0].textContent;
        currentNote.body = noteDiv.children[1].textContent;
        editNoteTitle.value = currentNote.title;
        editNoteBody.value = currentNote.body;

        displayModal(editModal);
    }

    if(event.target.classList.contains('delete')){
        let noteDiv = event.target.parentElement.parentElement;
        let title = noteDiv.children[0].textContent;
        let body = noteDiv.children[1].textContent;

        note.deleteNote({
            title: title,
            body: body
        });
    }
})


let note = new Note();
note.render();

saveBtn.addEventListener('click', () => {
    if(!(newNoteTitle.value && newNoteBody.value)){
        displayError(newModal);      
    }
    else {
        note.addNote({
            title: newNoteTitle.value,
            body: newNoteBody.value
        });

        clearModalValues(newModal);
        closeModal(newModal);
    }
})

updateBtn.addEventListener('click', () => {
    let index = (Note.notesList).findIndex(
        n =>  (n.title === currentNote.title && n.body === currentNote.body));
    
    if (!(editNoteTitle.value && editNoteBody.value)) {
        displayError(editModal);
    }
    else {
        Note.notesList[index].title = editNoteTitle.value;
        Note.notesList[index].body = editNoteBody.value;

        clearCurrentNote();
        clearModalValues(editModal);
        closeModal(editModal);
        note.render();
    }
    
})

discardBtn.addEventListener('click', () => {
    clearModalValues(newModal);
    closeModal(newModal);
})

deleteBtn.addEventListener('click', () => {
    note.deleteNote({
        title: currentNote.title,
        body: currentNote.body
    });
    
    clearCurrentNote();
    clearModalValues(editModal);
    closeModal(editModal);
})

