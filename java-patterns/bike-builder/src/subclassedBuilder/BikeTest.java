package subclassedBuilder;

import static org.junit.Assert.*;
import org.junit.Test;

/* Pros:
 * Simpler code with more natural inheritance
 * 
 * Cons:
 * Possible code smells in inner class inheritance
 * 
 * */

public class BikeTest {
	@Test
	public void unmodifiedMountainBikeHasSpeedOf1() {
		Bike bike = MountainBike.getBuilder().createBike().build();
		assertEquals(bike.getSpeed(), 1);
	}
	
	@Test
	public void unmodifiedFixedSpeedBikeHasSpeedOf2() {
		Bike bike = FixedBike.getBuilder().createBike().build();
		assertEquals(bike.getSpeed(), 2);
	}
	
	@Test
	public void unmodifiedRacingBikeHasSpeedOf3() {
		Bike bike = RacingBike.getBuilder().createBike().build();
		assertEquals(bike.getSpeed(), 3);
	}
	
	@Test
	public void fixedSpeedBikeWithSkinnyTireAndRolloverHandlebarHasSpeedOf5() {
		Bike bike = FixedBike.getBuilder().createBike().tires(new SkinnyTire()).handlebars(new RolloverHandlebar()).build();
		assertEquals(bike.getSpeed(), 5);
	}
	
	@Test
	public void MountainBikeWithWindBreakTireAndBullhornHandlebarHasSpeedOf5() {
		Bike bike = MountainBike.getBuilder().createBike().tires(new WindBreakTire()).handlebars(new BullhornHandlebar()).build();
		assertEquals(bike.getSpeed(), 5);
	}
	
	@Test
	public void RacingBikeWithFatTireAndStraightHandlebarHasSpeedOf3() {
		Bike bike = RacingBike.getBuilder().createBike().tires(new FatTire()).handlebars(new StraightHandlebar()).build();
		assertEquals(bike.getSpeed(), 3);
	}
}
