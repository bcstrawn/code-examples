
public class BikeBuilder {
	private Bike currentBike = null;

	public BikeBuilder createBike(String type) {
		if (type.equals("mountain")) {
			this.currentBike = new MountainBike();
		} else if (type.equals("fixed")) {
			this.currentBike = new FixedBike();			
		} else if (type.equals("racing")) {
			this.currentBike = new RacingBike();
		}
		
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
