import {  Schema } from 'prosemirror-model'

export const schema = new Schema({
    nodes: {
        text: {
            group: 'inline',
        },
        paragraph: {
            group: 'block',
            content: 'inline*',
            toDOM() { return ['p', 0] },
            parseDOM: [{ tag: 'p' }], },
        todo: {
            group: 'block',
            content: 'text*',
            attrs: { done: { default: false } },
            toDOM: (node) => ['todo',
                              ['input', { type: 'checkbox', checked: (node.attrs.done as boolean ?? false) ? '1' : undefined }],
                              ['label', 0]],

            parseDOM: [{tag: 'todo'}],
        },
        doc: {
            content: 'block+' },
    },
})
