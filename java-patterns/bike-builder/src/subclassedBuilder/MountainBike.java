package subclassedBuilder;

public class MountainBike extends Bike {

	private MountainBike() {
		this.speed = 1;
	}

	public static BikeBuilder getBuilder() {
		return new MountainBike().new MountainBikeBuilder();
	}

	public class MountainBikeBuilder extends BikeBuilder {
		@Override
		public BikeBuilder createBike() {
			this.currentBike = new MountainBike();
			return this;
		}
	}
}
