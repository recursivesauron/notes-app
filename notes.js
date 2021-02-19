const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if(duplicateNote === undefined){
        notes.push({
            title: title,
            body: body
        })
    
        debugger
        saveNotes(notes)
    }
    else{
        console.log(chalk.red('Note title taken'))
    }
    
}

const removeNote = (title) => {
    const notes = loadNotes()
    
    const notesToKeep = notes.filter((note) => note.title !== title)
    saveNotes(notesToKeep)
    if(notes.length === notesToKeep.length){
        console.log(chalk.red('No note matching that title'))
    }
    else{
        console.log(chalk.green('Note removed successfully'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.inverse('Your Notes:'));
    notes.forEach((note) => console.log(note.title))
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find((note) => note.title == title)

    if(noteToRead){
        console.log(noteToRead.body)
    }
    else{
        console.log(chalk.red('No note with that title found'))
    }
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(e){
        return []
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes))
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}