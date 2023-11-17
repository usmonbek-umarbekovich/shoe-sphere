import DeleteModal from '@/components/DeleteModal/DeleteModal';
import {
  Menu,
  MenuItem,
  MenuList,
  MenuProps,
  SxProps,
  Typography,
} from '@mui/material';
import {useRouter} from 'next/router';
import {useState} from 'react';

const styles: Record<string, SxProps> = {
  menuList: {
    width: '7rem',
  },
  menuItem: {
    padding: '0.5rem 1rem',
  },
};

type ButtonMenuProps = MenuProps & {
  productid: number;
  onDeleteProduct: () => void;
};

const ButtonMenu = ({
  productid,
  onDeleteProduct,
  ...props
}: ButtonMenuProps) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const router = useRouter();
  return (
    <>
      <Menu {...props}>
        <MenuList sx={styles.menuList}>
          <MenuItem
            divider
            sx={styles.menuItem}
            onClick={() => router.push(`/products/${productid}`)}
          >
            <Typography fontWeight={300}>View</Typography>
          </MenuItem>
          <MenuItem
            divider
            sx={styles.menuItem}
            onClick={() => router.push(`/my-products/?productId=${productid}`)}
          >
            <Typography fontWeight={300}>Edit</Typography>
          </MenuItem>
          <MenuItem
            sx={styles.menuItem}
            onClick={() => setOpenDeleteModal(true)}
          >
            <Typography fontWeight={300}>Delete</Typography>
          </MenuItem>
        </MenuList>
      </Menu>
      <DeleteModal
        header="Are you sure to delete selected item?"
        description="Warning: Deleting this product will permanently remove it from the system. This action cannot be undone. Are you sure you want to proceed?"
        isModalOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onDelete={() => {
          onDeleteProduct();
          setOpenDeleteModal(false);
        }}
      />
    </>
  );
};
export default ButtonMenu;
