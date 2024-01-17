import { notesListEl } from "./app.js";

export class Note {
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