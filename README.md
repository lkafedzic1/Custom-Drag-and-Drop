# Custom Drag-and-Drop Application in React

This project is a lightweight solution for intuitive, custom drag-and-drop component built without any external libraries. It allows users to drag items from a list and drop them into a designated drop zone. The dropped items remain in the position where they’re released, and users have the option to remove items from the drop zone and which sends them back to their original list. This drag-and-drop component can be reused and tailored to fit various application requirements.


## Functionalities

This solution provides the following functionalities:
- **Drag and drop**: Move items from a list into a drop zone.
- **Reset item**: Items in the drop zone can be removed and returned to the original list.
- **Precise positioning**: Items can be positioned based on the position where they are droped, providing intuitive control over item positioning.

## Available scripts

### Installation

**Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/drag-and-drop-app.git
   cd drag-and-drop-app
```

**Instal dependencies**:
   ```bash
   npm install
```

## In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Future improvements

Some potential next steps for expanding this project include:

- **Multi-item selection**: Allow users to select and drag multiple items at once.
- **Improved styling**: Improve visual indicators to show where a new item would be placed within the drop zone in order to guide users on possible drop locations and displaying automatic reordering of existing items withing the drop zone.
- **Persistent state**: Save dropped item positions to local storage or a database, so positions are retained upon page refresh.
