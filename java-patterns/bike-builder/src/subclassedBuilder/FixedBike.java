package subclassedBuilder;

public class FixedBike extends Bike {
	private FixedBike() {
		this.speed = 2;
	}

	public static BikeBuilder getBuilder() {
		return new FixedBike().new FixedBikeBuilder();
	}

	public class FixedBikeBuilder extends BikeBuilder {
		@Override
		public BikeBuilder createBike() {
			this.currentBike = new FixedBike();
			return this;
		}
	}
}
