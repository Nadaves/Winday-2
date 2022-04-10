import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ImgMediaCard({ name, img, wind, dir, gust }) {
  return (
    <Card sx={{ maxWidth: 345, direction: "rtl" }}>
      <CardMedia component="img" alt={name} height="140" image={img} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {wind}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {dir}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {gust}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">מצלמה</Button>
        <Button size="small">המלצות</Button>
      </CardActions>
    </Card>
  );
}
