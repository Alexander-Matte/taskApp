export function useSaveDescription(store, id, newDescription) {
  store.updateTaskDescription(id, newDescription)
  store.setEditingStatus(false)
}
