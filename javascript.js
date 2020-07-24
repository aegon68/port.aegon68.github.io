var canvas= document.getElementById("canvas");
var originalImage=null, imageGray=null, imageRed=null, imageRainbow=null;
function loadImage(){
	var inputfile = document.getElementById("file");
	originalImage = new SimpleImage(inputfile);
	imageGray = new SimpleImage(inputfile);
	imageRed = new SimpleImage(inputfile);
	imageRainbow = new SimpleImage(inputfile);
	
	originalImage.drawTo(canvas); 
}

function grayFilter(){
	//input the original image
	for(var pixel of imageGray.values())
	{
		var orgPix =  originalImage.getPixel(pixel.getX(),pixel.getY());
		imageGray.setPixel(pixel.getX(),pixel.getY(),orgPix);
	}
	//gray filter
	for(var pixel of imageGray.values())
	{
		var avg=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
		pixel.setRed(avg);
		pixel.setGreen(avg);
		pixel.setBlue(avg);
	}
	imageGray.drawTo(canvas);

}

function redFilter()
{
	for(var pixel of imageRed.values())
	{
		var orgPix = originalImage.getPixel(pixel.getX(),pixel.getY());
		imageRed.setPixel(pixel.getX(),pixel.getY(),orgPix);
	}

	for(var pixel of imageRed.values())
	{
		var avg = (pixel.getRed()+pixel.getBlue()+pixel.getGreen())/3;
		if(avg < 128)
		{
			pixel.setRed(180);
			pixel.setGreen(0);
			pixel.setBlue(0);
		}
		else
		{
			pixel.setRed(210);
			pixel.setGreen(255 - avg);
			pixel.setBlue(255 - avg);
		}
	}
	imageRed.drawTo(canvas);
	
}

function rainbowFilter(){
	for(var pixel of imageRainbow.values())
	{
		var orgPix = originalImage.getPixel(pixel.getX(),pixel.getY());
		imageRainbow.setPixel(pixel.getX(),pixel.getY(),orgPix);
	}

	for(var pixel of imageRainbow.values())
	{
		var avg = (pixel.getRed()+pixel.getBlue()+pixel.getGreen())/3;
		
		//Red strips
		if(pixel.getY() < imageRainbow.getHeight() * (1/7))
		{
			if(avg < 128)
			{
				pixel.setRed(2*avg);
				pixel.setGreen(0);
				pixel.setBlue(0);
			}
			else
			{
				pixel.setRed(255);
				pixel.setGreen(2*avg - 255);
				pixel.setBlue(2*avg - 255);
			}
		}
		//orange strips
		else if(pixel.getY() < imageRainbow.getHeight() * (2/7))
		{
			if(avg < 128)
			{
				pixel.setRed(2*avg);
				pixel.setGreen(0.8*avg);
				pixel.setBlue(0);
			}
			else
			{
				pixel.setRed(255);
				pixel.setGreen(1.2*avg - 251);
				pixel.setBlue(2*avg - 255);
			}
		}
		//yellow strips
		else if(pixel.getY() < imageRainbow.getHeight() * (3/7))
		{
			if(avg < 128)
			{
				pixel.setRed(2*avg);
				pixel.setGreen(2*avg);
				pixel.setBlue(0);
			}
			else
			{
				pixel.setRed(255);
				pixel.setGreen(255);
				pixel.setBlue(2*avg - 255);
			}
		}
		//Green strips
		else if(pixel.getY() < imageRainbow.getHeight() * (4/7))
		{
			if(avg < 128)
			{
				pixel.setRed(0);
				pixel.setGreen(2*avg);
				pixel.setBlue(0);
			}
			else
			{
				pixel.setRed(2*avg-255);
				pixel.setGreen(255);
				pixel.setBlue(2*avg - 255);
			}
		}
		//Blue strips
		else if(pixel.getY() < imageRainbow.getHeight() * (5/7))
		{
			if(avg < 128)
			{
				pixel.setRed(0);
				pixel.setGreen(0);
				pixel.setBlue(2*avg);
			}
			else
			{
				pixel.setRed(2*avg-255);
				pixel.setGreen(2*avg-255);
				pixel.setBlue(255);
			}
		}
		//Indigo strips
		else if(pixel.getY() < imageRainbow.getHeight() * (6/7))
		{
			if(avg < 128)
			{
				pixel.setRed(0.8*avg);
				pixel.setGreen(0);
				pixel.setBlue(2*avg);
			}
			else
			{
				pixel.setRed(1.2*avg - 51);
				pixel.setGreen(2*avg - 255);
				pixel.setBlue(255);
			}
		}
		//Violet strips
		else if(pixel.getY() < imageRainbow.getHeight())
		{
			if(avg < 128)
			{
				pixel.setRed(1.6*avg);
				pixel.setGreen(0);
				pixel.setBlue(1.6*avg);
			}
			else
			{
				pixel.setRed(0.4*avg + 153);
				pixel.setGreen(2*avg - 255);
				pixel.setBlue(0.4*avg + 153);
			}
		}
	}
	imageRainbow.drawTo(canvas);
}	

function resetImage(){
	var context = canvas.getContext("2d");
	context.clearRect(0,0,canvas.width,canvas.height);
	originalImage.drawTo(canvas);
}




