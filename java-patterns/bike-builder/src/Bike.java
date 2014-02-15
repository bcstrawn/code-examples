
public class Bike {
	int speed = 0;
	Tire tires = null;
	Handlebar handlebars = null;

	public void setTires(Tire tire) {
		if (this.tires != null) {
			this.speed -= this.tires.speedModifier();
		}
		this.tires = tire;
		this.speed += tire.speedModifier();
	}

	public void setHandlebars(Handlebar handlebar) {
		if (this.handlebars != null) {
			this.speed -= this.handlebars.speedModifier();
		}
		this.handlebars = handlebar;
		this.speed += handlebar.speedModifier();
	}

	public int getSpeed() {
		return this.speed;
	}
}
