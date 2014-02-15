package strategy;

public class Bike {
	private int speed = 0;
	private Tire tires = null;
	private Handlebar handlebars = null;
	
	private Bike(int speed) {
		this.speed = speed;
	}
	
	public static BikeBuilder getBuilder() {
		return new Bike(0).new BikeBuilder();
	}

	private void setTires(Tire tire) {
		if (this.tires != null) {
			this.speed -= this.tires.speedModifier();
		}
		this.tires = tire;
		this.speed += tire.speedModifier();
	}

	private void setHandlebars(Handlebar handlebar) {
		if (this.handlebars != null) {
			this.speed -= this.handlebars.speedModifier();
		}
		this.handlebars = handlebar;
		this.speed += handlebar.speedModifier();
	}

	public int getSpeed() {
		return this.speed;
	}
	

	public class BikeBuilder {
		protected Bike currentBike = null;
	
		public BikeBuilder createBike(BikeType bikeType) {
			this.currentBike = new Bike(bikeType.getSpeed());
			return this;
		}
		
		public BikeBuilder tires(Tire tire) {
			this.currentBike.setTires(tire);
			return this;
		}
		
		public BikeBuilder handlebars(Handlebar handlebar) {
			this.currentBike.setHandlebars(handlebar);
			return this;
		}
		
		public Bike build() {
			return this.currentBike;
		}
	}
}