import { useState } from 'react';
import * as SQLite from 'expo-sqlite';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createStore } from 'tinybase';
import { createLocalPersister } from 'tinybase/persisters/persister-browser';
import { createExpoSqlitePersister } from 'tinybase/persisters/persister-expo-sqlite';
import {
  Provider,
  useAddRowCallback,
  useCreatePersister,
  useCreateStore,
  useDelTableCallback,
  useHasTable,
  useRow,
  useSetCellCallback,
  useSortedRowIds,
} from 'tinybase/ui-react';

// The TinyBase table contains the todos, with 'text' and 'done' cells.
const TODO_TABLE = 'todo';
const TEXT_CELL = 'text';
const DONE_CELL = 'done';

// Emojis to decorate each todo.
const NOT_DONE_ICON = String.fromCodePoint('0x1F7E0');
const DONE_ICON = String.fromCodePoint('0x2705');

// The text input component to add a new todo.
const NewTodo = () => {
  const [text, setText] = useState('');
  const handleSubmitEditing = useAddRowCallback(
    TODO_TABLE,
    ({ nativeEvent: { text } }) => {
      setText('');
      return { [TEXT_CELL]: text, [DONE_CELL]: false };
    }
  );
  return (
    <TextInput
      value={text}
      onChangeText={(text) => setText(text)}
      onSubmitEditing={handleSubmitEditing}
      placeholder='What do you want to do today?'
      style={styles.input}
    />
  );
};

// A single todo component, either 'not done' or 'done': press to toggle.
const Todo = ({ id }) => {
  const { text, done } = useRow(TODO_TABLE, id);
  const handlePress = useSetCellCallback(
    TODO_TABLE,
    id,
    DONE_CELL,
    () => (done) => !done
  );
  return (
    <TouchableOpacity
      key={id}
      onPress={handlePress}
      style={[styles.todo, done ? styles.done : null]}
    >
      <Text style={styles.todoText}>
        {done ? DONE_ICON : NOT_DONE_ICON} {text}
      </Text>
    </TouchableOpacity>
  );
};

// A list component to show all the todos.
const Todos = () => {
  const renderItem = ({ item: id }) => <Todo id={id} />;
  return (
    <FlatList
      data={useSortedRowIds(TODO_TABLE, DONE_CELL)}
      renderItem={renderItem}
      style={styles.todos}
    />
  );
};

// A button component to delete all the todos, only shows when there are some.
const ClearTodos = () => {
  const handlePress = useDelTableCallback(TODO_TABLE);
  return useHasTable(TODO_TABLE) ? (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.clearTodos}>Clear all</Text>
    </TouchableOpacity>
  ) : null;
};

// The main app.
const App = () => {
  // Initialize the (memoized) TinyBase store and persist it.
  const store = useCreateStore(createStore);
  useAndStartPersister(store);

  return (
    // Wrap the app in TinyBase context, so the store is default throughout and
    // a SafeAreaProvider/SafeAreaView so it fits the screen.
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Text style={styles.heading}>TinyBase Example</Text>
          <NewTodo />
          <Todos />
          <ClearTodos />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
};

const useAndStartPersister = (store) =>
  // Persist store to Expo SQLite or local storage; load once, then auto-save.
  useCreatePersister(
    store,
    (store) =>
      Platform.OS === 'web'
        ? createLocalPersister(store, 'todos')
        : createExpoSqlitePersister(store, SQLite.openDatabaseSync('todos.db')),
    [],
    (persister) => persister.load().then(persister.startAutoSave)
  );

// Styles for the app.
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    margin: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderColor: '#999',
    borderRadius: 8,
    borderWidth: 2,
    flex: 0,
    height: 64,
    marginTop: 16,
    padding: 16,
    fontSize: 20,
  },
  todos: {
    flex: 1,
    marginTop: 16,
  },
  todo: {
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#ffd',
  },
  done: {
    backgroundColor: '#dfd',
  },
  todoText: {
    fontSize: 20,
  },
  clearTodos: {
    margin: 16,
    flex: 0,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default App;
