import InventoryDialog from './InventoryDialog.vue';
import { createVNode, render } from 'vue';
import { getPlayerInventory } from '@/api/entity-management';

export const showInventory = async (entityId, playerName) => {
    const data = await getPlayerInventory(entityId);
    const container = document.createElement('div');
    const vNode = createVNode(InventoryDialog, {
        title: `玩家: ${playerName} (${entityId}) 的背包`,
        inventory: data,
        visible: true,
        onClosed: () => {
            document.body.removeChild(container);
        },
    });
    render(vNode, container);
    document.body.appendChild(container);
};
