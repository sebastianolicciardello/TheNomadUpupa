import type { Plugin } from 'unified';
import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

// Remark plugin to transform YouTube Music links into custom components
export const remarkYouTubeMusic: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index === undefined) return;
      
      const text = node.value;
      const youtubeMusicRegex = /(https?:\/\/(?:music\.youtube\.com\/watch\?v=|(?:www\.)?youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+(?:\S*)?)/g;
      
      let match;
      const replacements = [];
      let lastIndex = 0;
      
      while ((match = youtubeMusicRegex.exec(text)) !== null) {
        const url = match[1];
        const startIndex = match.index;
        const endIndex = startIndex + match[0].length;
        
        // Add text before the URL
        if (startIndex > lastIndex) {
          replacements.push({
            type: 'text',
            value: text.slice(lastIndex, startIndex)
          });
        }
        
        // Add the YouTube Music component
        replacements.push({
          type: 'mdxJsxFlowElement',
          name: 'YouTubeMusicPlayer',
          attributes: [
            {
              type: 'mdxJsxAttribute',
              name: 'url',
              value: url
            }
          ],
          children: []
        });
        
        lastIndex = endIndex;
      }
      
      // If we found matches, replace the node
      if (replacements.length > 0) {
        // Add remaining text
        if (lastIndex < text.length) {
          replacements.push({
            type: 'text',
            value: text.slice(lastIndex)
          });
        }
        
        // Replace the current node with new nodes
        parent.children.splice(index, 1, ...replacements);
      }
    });
  };
};