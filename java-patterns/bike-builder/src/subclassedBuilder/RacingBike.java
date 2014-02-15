package subclassedBuilder;

public class RacingBike extends Bike {
	private RacingBike() {
		this.speed = 3;
	}

	public static BikeBuilder getBuilder() {
		return new RacingBike().new RacingBikeBuilder();
	}

	public class RacingBikeBuilder extends BikeBuilder {
		@Override
		public BikeBuilder createBike() {
			this.currentBike = new RacingBike();
			return this;
		}
	}
}
