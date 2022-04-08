import { applyDevTools } from 'prosemirror-dev-toolkit';
import { Node as ProsemirrorNode, NodeType } from 'prosemirror-model'
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { keymap } from 'prosemirror-keymap'
import { history, redo, undo } from 'prosemirror-history'
import { baseKeymap } from 'prosemirror-commands'
import { inputRules, textblockTypeInputRule } from 'prosemirror-inputrules'
import { schema } from './schema'
const todoRule = textblockTypeInputRule(new RegExp("^\\s*([-+])\\s$"),
        schema.nodes.todo, match => ({ done: match[1] == '+' }))

export const sampleDoc = {type: "doc", content: [
        {type: "todo", content: [{type: 'text', text: "<- deleting this text up to the checkbox causes the cursor to get stuck on Chrome but not on Firefox, making it impossible to insert additional text"}]},
        {type: "paragraph", content: [{type: "text", text: "a paragraph"}]}]}

export const attach = (elementId: string, applyDevToolsToViews?: boolean): void => {
    const rootElement = document.getElementById(elementId)!

    const doc = ProsemirrorNode.fromJSON(schema, sampleDoc)
    doc.check()
   const state = EditorState.create({
        schema: schema,
        doc: doc,
        plugins: [
            inputRules({ rules:  [todoRule] }),
            history(),
            keymap({ 'Mod-z': undo, 'Mod-y': redo, 'Shift-Mod-z': redo }),
            keymap(baseKeymap),
        ] })
    const view = new EditorView(rootElement, {
        state: state,
    })

    rootElement?.getElementsByTagName('div')[0].focus()
    if(applyDevToolsToViews ?? false) {
        applyDevTools(view)
    }
}
