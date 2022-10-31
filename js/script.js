const notes_div = document.querySelector(".add-notes");
const notes_data = document.querySelector("#notes_data");

const updateLocalData = () => {
    const data = document.querySelectorAll("textarea");

    const notes = [];
    data.forEach((note) => {
        if(note.value)
            notes.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes))
}

const addNote = (noteText="") => {

    const note = document.createElement('div');
    note.classList.add("col-lg-3", "col-md-4", "col-sm-6", "col-12", "mt-4");
    const divHtml = `<div class="note-div">
                <ul class="float-end edit-delete">
                    <li class="edit-icon"><i class="fa-solid fa-pen"></i></li>
                    <li class="delete-icon"><i class="fa-solid fa-trash-can"></i></li>
                </ul>
                <div class="main ${noteText ? "" : "d-none"}"></div>
                <textarea name="note" id="note" rows="3" placeholder="Type something here...." class="w-100 ${noteText ? "d-none" : ""}"></textarea>
            </div>`;
    
    note.insertAdjacentHTML("afterbegin", divHtml);
    
    const edit_btn = note.querySelector(".edit-icon");
    const delete_btn = note.querySelector(".delete-icon");
    const main = note.querySelector(".main");
    const txtarea = note.querySelector("#note");

    txtarea.value = noteText;
    main.innerHTML = noteText;


    delete_btn.addEventListener('click', () => {
        note.remove();
        updateLocalData();
    });

    edit_btn.addEventListener('click', () => {
        main.classList.toggle('d-none');
        txtarea.classList.toggle('d-none');
    });

    txtarea.addEventListener('change', (event) => {
        console.log(event.target.value);
        main.innerHTML = event.target.value;
        main.classList.toggle('d-none');
        txtarea.classList.toggle('d-none');
        updateLocalData();
    });



    notes_data.append(note);
}


notes_div.addEventListener('click', () => {
    addNote();
});

const allNotes = JSON.parse(localStorage.getItem('notes'));

if(allNotes.length > 0) {
    allNotes.forEach((note) => {
        addNote(note);
    });
}
else 
    addNote();
