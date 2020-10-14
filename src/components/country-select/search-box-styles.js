import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ spacing, shape }) => ({
  root: {
    position: 'absolute',
    left: spacing(2),
    top: spacing(2),
    display: 'flex',
    alignItems: 'center',
    width: 250,
  },
  input: {
    borderRadius: 0,
    borderBottomRightRadius: shape.borderRadius,
  },
  inputInput: {
    padding: spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${spacing(4)}px)`,
    width: '100%',
  },
}));