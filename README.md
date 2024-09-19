# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Tipps
- Chakra Components von hier benutzen: https://chakra-templates.vercel.app/components

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


## algo

great. let's start with the visualisation logic. we have input parameters w_node, w_partner and w_children and the json family tree. The idea is to
- if id has one spouse with children: connect id and spouse via smoothed line with an intermediary node which is in the middle of id and spouse and shifted h_intermediary down
- take that intermediary node (just a dot) as starting point for the next generation
- if id has no spouse with children: just the id node
- if id has several spouses with children: place the id to the left, then first spouse, then second spouse and so on. for each spouse there is an intermediary node placed h_intermediary below the spouse. The intermediary nodes are the starting point for the next generations

Given the position (x_pos_X, y_pos_X) of the intermediary node X we draw the tree recursively as follows, where family_tree is the json family tree from the getFamilyTreeById endpoint. 

Recall that the family tree looks like this:

familyTreeMember = {
    "id": 1,
    "subtree_len": 23.5,
    "family": [
      {
        "spouse": 8,
        "subtree_len": 23.5,
        "children": [list of familyTreeMember]
      }
    ]
}

id is the id of the current familyTreeMember
spouse_id is the id of the spouse of a given family in familyTreeMember.family
subtree_len_family = familyTreeMember.family[spouse = spouse_id].subtree_len
subtree_len_id = familyTreemember[id = id].subtree_len

Pseudo code:

def draw_tree(x_pos_X, y_pos_Y, family_tree, id, spouse_id, w_node, w_partner, w_children, h_intermediary, h_gen):
  subtree_len = compund subtree_len of the children of id and spouse_id
  current_position = x_pos_X - subtree_len/2
  for each child of id and spouse_id:
    if child has no spouse:
       child_position = current_position + child.subtree_len/2
       current_position += child.subtree_len
       draw FamilyNode at position (child_position, y_pos_X - h_gen)
       connect (x_pos_X, y_pos_X) with smooth line to (child_position, y_pos_X - h_gen)
    else if child has exactly one spouse:
      child_position = current_position + child.subtree_len/2 - w_partner/2 - w_node / 2
      spouse_position = child_position + w_partner/2 + w_node
      current_position += child.subtree_len
      draw FamilyNode at position (child_position, y_pos_X - h_gen)
      draw FamilyNode at position (spouse_position, y_pos_X - h_gen)
      connect these nodes to X with smooth lines
      draw_tree((child_position + spouse_position)/2, y_pos_X - h_gen family_tree, id, spouse_id,  family_tree, w_node, w_partner, w_children, h_intermediary, h_gen)
    else if child has several spouses with children:
      child_position = current_position + w_children/2 + w_node/2
      current_position += w_partner/ 2 + w_node / 2
      draw FamilyNode at position (child_position, y_pos_X - h_gen)
      connect FamilyNode to X with smooth lines
      for family in families of child:
        spouse_position = current_position + family.len_subtree/2
        current_position += family.len_subtree
        draw FamilyNode at position (spouse_position, y_pos_X - h_gen)
        draw intermediary node at position (spouse_position, y_pos_X-h_gen-h_intermediary)
        connect FamilyNode (child) to intermediary node with smooth line
        connect FamilyNode (spouse) to intermediary node with smooth line
        draw_tree(spouse_position, y_pos_X - h_gen family_tree, id, spouse_id, family_tree, w_node, w_partner, w_children, h_intermediary, h_gen)

then initialize for a given start id by adding a fake first level to the json so that the id we are interested in is the first and only child of parents which are not drawn. The fake intermediary node for the first call of draw_tree sits at (family_tree[id = id].subtree_len/2, 0)
